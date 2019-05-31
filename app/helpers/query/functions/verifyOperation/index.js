module.exports = {
  createNewDoc: require("./operations/createNewDoc"),
  createNewSubdoc: require("./operations/createNewSubdoc"),

  readDoc: require("./operations/readDoc"),
  readDocByAllowedOnly: require("./operations/readDocByAllowedOnly"),
  readDocByCreatorOnly: require("./operations/readDocByCreatorOnly"),
  readDocs: require("./operations/readDocs"),
  readUserDocSelfOnly: require("./operations/readUserDocSelfOnly"),

  writeDoc: require("./operations/writeDoc"),
  writeDocByAllowedOnly: require("./operations/writeDocByAllowedOnly"),
  writeDocByCreatorOnly: require("./operations/writeDocByCreatorOnly"),
  writeSubdoc: require("./operations/writeSubdoc"),
  writeUserDocSelfOnly: require("./operations/writeUserDocSelfOnly"),

  voHelpers: require("./helpers"),
}
