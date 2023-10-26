const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.log(contacts);

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
      console.log("Unknown action:(");
  }
}
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "e6ywwRe4jcqxXfCZOj_1e" });
// invokeAction({
//   action: "add",
//   name: "Galyna Shevchenko",
//   email: "galu4ok@ukr.net",
//   phone: "(044) 111-6688",
// });
// invokeAction({ action: "remove", id: "3nWxLAn7CZ35ft_J_FYeZ" });
