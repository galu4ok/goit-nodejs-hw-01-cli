//Iніціалізація модуля з промісами та модуля для роботи з файловою системою
const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

// Визначення змінної для зберігання шляху до файлу з контактами
const contactsPath = path.join(__dirname, ".", "db", "contacts.json");

//Функції-хелпери для зчитування та перезаписування контактів

async function readContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

//Функції для роботи з колекцією контактів

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];
  await writeContacts(newContacts);
  return contacts[index];
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
