import { program } from "commander";
import * as conactsServices from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const contactsList = await conactsServices.listContacts();
      return console.log(contactsList);

    case "get":
      const contact = await conactsServices.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await conactsServices.addContact(data);
      return console.log(newContact);

    case "remove":
      const deletedContact = await conactsServices.removeContact(id);
      return console.log(deletedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
