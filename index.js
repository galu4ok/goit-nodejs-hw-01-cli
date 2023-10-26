const { Command } = require("commander");

const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);

    case "get":
      const contact = await getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await addContact(name, email, phone);
      return newContact;

    case "remove":
      const deletedContact = await removeContact(id);
      return console.log(deletedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();
program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv);

invokeAction(argv);
