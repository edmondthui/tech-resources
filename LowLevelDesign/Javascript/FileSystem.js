class FileSystem {
  constructor() {
    this.root = new Node();
  }

  ls(path) {
    let node = this.root.search(path);
    if (node === null) return [];
    if (node.isFile) return [node.name];
    return Object.keys(node.children);
  }

  mkdir(path) {
    this.root.insert(path, false);
  }

  addContentToFile(path, content) {
    const node = this.root.insert(path, true);
    node.content.push(content);
  }

  readContentFromFile(path) {
    const node = this.root.search(path);
    if (!node || !node.isFile) {
      throw Error("File not found");
    }
    return node.content.join("");
  }
}

class Node {
  constructor() {
    this.name = null;
    this.isFile = false;
    this.children = {};
    this.content = [];
  }

  insert(filePath, isFile) {
    let node = this;
    let paths = filePath.split("/");
    for (let path of paths.slice(1)) {
      if (!node.children[path]) {
        let newNode = new Node();
        node.children[path] = newNode;
      }
      node.name = path;
      node = node.children[path];
    }

    node.isFile = isFile;
    return node;
  }

  search(filePath) {
    let node = this;
    let paths = filePath.split("/");
    for (let path of paths.slice(1)) {
      if (!node.children[path]) return null;
      node = node.children[path];
    }
    return node;
  }
}

let fileSystem = new FileSystem();

fileSystem.mkdir("/a/b/c");
fileSystem.addContentToFile("/a/b/c/d", "Testing");
let ls = fileSystem.ls("/a/b/c");
console.log(ls);
let content = fileSystem.readContentFromFile("/a/b/c/d");
console.log(content);
console.log(fileSystem);
