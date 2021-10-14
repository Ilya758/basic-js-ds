const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor() {
    this.rt = null;
  }

  root() {
    return this.rt;
  }

  add(data) {
    this.rt = helper(this.rt, data);

    function helper(node, val) {

      if (!node) {
        return new Node(val);
      } else {

        if (node.data === val) {
          return node;
        } else {

          if (node.data > val) {
            node.left = helper(node.left, val);
          } else {
            node.right = helper(node.right, val);
          }

        }

      }

      return node;
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    return search(this.rt, data);

    function search(node, val) {
      if (!node) {
        return null;
      }

      if (node.data === val) {
        return node;
      }

      return node.data > val ? search(node.left, val) : search(node.right, val);
    }
  }

  remove(data) {
    this.rt = removeNode(this.rt, data);

    function removeNode(node, val) {

      if (!node) {
        return null;
      }

      if (node.data > val) {
        node.left = removeNode(node.left, val);
        return node;
      } else if (node.data < val) {
        node.right = removeNode(node.right, val);
        return node;
      } else {

        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;

        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }

        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {

    if (!this.rt) {
      return null;
    }

    let node = this.rt;

    while (node.left) {
      node = node.left
    }

    return node.data;

  }

  max() {
    if (!this.rt) {
      return null;
    }

    let node = this.rt;

    while (node.right) {
      node = node.right
    }

    return node.data;
  }

}