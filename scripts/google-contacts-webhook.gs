// Apps Script-webapp in het Google-account van ellen@lumenyoga.nl.
// De site (server/index.ts) post alleen { id, origin }. Het script haalt de
// gegevens met dat eenmalige id zelf op bij een vast domein en zet de persoon
// in het label "Nieuwsbrief Lumen yoga". Bestaat het e-mailadres al in de
// contacten, dan komt alleen het label erbij.
//
// Installeren: script.google.com als ellen@lumenyoga.nl, Services > People API,
// Implementeren > Web-app, uitvoeren als "Ik", toegang "Iedereen".

var ORIGINS = ['https://lumenyoga.nl', 'https://preview.lumenyoga.nl'];
var LABEL_NAME = 'Nieuwsbrief Lumen yoga';

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (ORIGINS.indexOf(body.origin) < 0 || !/^[0-9a-f-]{36}$/.test(body.id)) {
      return reply({ ok: false, error: 'invalid' });
    }
    var res = UrlFetchApp.fetch(body.origin + '/api/nieuwsbrief-contact/' + body.id, {
      muteHttpExceptions: true,
    });
    if (res.getResponseCode() !== 200) return reply({ ok: false, error: 'unknown id' });
    var contact = JSON.parse(res.getContentText()).contact;
    return reply(addToNewsletter(contact));
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function addToNewsletter(contact) {
  var email = String(contact.email || '').trim().toLowerCase();
  if (!email) return { ok: false, error: 'no email' };
  var label = labelResourceName();

  var existing = findByEmail(email);
  if (existing) {
    People.ContactGroups.Members.modify({ resourceNamesToAdd: [existing] }, label);
    return { ok: true, action: 'label added' };
  }

  var person = {
    emailAddresses: [{ value: contact.email }],
    biographies: [{ value: contact.note || 'Nieuwsbrief via lumenyoga.nl', contentType: 'TEXT_PLAIN' }],
    memberships: [{ contactGroupMembership: { contactGroupResourceName: label } }],
  };
  if (contact.name) person.names = [{ unstructuredName: contact.name }];
  if (contact.phone) person.phoneNumbers = [{ value: contact.phone }];
  People.People.createContact(person);
  return { ok: true, action: 'created' };
}

function findByEmail(email) {
  var pageToken;
  do {
    var page = People.People.Connections.list('people/me', {
      personFields: 'emailAddresses',
      pageSize: 1000,
      pageToken: pageToken,
    });
    var people = page.connections || [];
    for (var i = 0; i < people.length; i++) {
      var addresses = people[i].emailAddresses || [];
      for (var j = 0; j < addresses.length; j++) {
        if (String(addresses[j].value).trim().toLowerCase() === email) return people[i].resourceName;
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
  return null;
}

function labelResourceName() {
  var groups = People.ContactGroups.list({ pageSize: 1000 }).contactGroups || [];
  for (var i = 0; i < groups.length; i++) {
    if (groups[i].name === LABEL_NAME) return groups[i].resourceName;
  }
  return People.ContactGroups.create({ contactGroup: { name: LABEL_NAME } }).resourceName;
}

function reply(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
