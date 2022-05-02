const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  root() {
    if(!this.tree){
      return null;
    }
    return this.tree;
  }

  add(data) {
    this.min = this.min || data;
    this.max = this.max || data;

    this.min = this.min > data ? data : this.min;
    this.max = this.max < data ? data : this.max;

    if(!this.tree) {
      this.tree = new Node(data);
      
      return this;
    }

    function addL(tree, d) {
      if(d > tree.data) {
        if(tree.right === null) {
          tree.right = new Node(d);
        } else {
          tree.right = addL(tree.right, d);
        }
      } else if(d < tree.data) {
        if(tree.left === null) {
          tree.left = new Node(d);
        } else {
          tree.left = addL(tree.left, d);
        }
      }

      return tree;
    }


    this.tree = addL(this.tree, data);

    return this;
  }

  has(data) {
    let res = false;

    function ob(tr) {
      if(tr !== null) {
        ob(tr.left);
        if(data == tr.data) res = true;
        ob(tr.right);
      }
    }

    ob(this.tree);

    return res;
  }

  find(data) {
    let res = null;

    function ob(tr) {
      if(tr !== null) {
        ob(tr.left);
        if(data == tr.data) res = tr;
        ob(tr.right);
      }
    }

    ob(this.tree);

    return res;
  }

  remove(data) {
    function rNode(tr, d) {
      if(tr === null) {
        return null;
      } else if (d < tr.data) {
        tr.left = rNode(tr.left, d);
        return tr;
      } else if(d > tr.data) {
        tr.right = rNode(tr.right, d);
        return tr;
      } else {
        if(tr.left === null && tr.right === null) {
          tr = null;
          return tr;
        }

        if(tr.left === null) {
          tr = tr.right;
          return tr;
        } else if(tr.right === null) {
          tr = tr.left;
          return tr;
        }

        let min = tr.right.data;
        function ob(tr) {
          if(tr !== null) {
            ob(tr.left);
            if(min > tr.data) min = tr.data;
            ob(tr.right);
          }
        }
        ob(tr.right);

        tr.data = min;
        tr.right = rNode(tr.right, min);
        return tr;
      }

    }

    //return remove(data)
    return rNode(this.tree, data);
  }

  min() {
    let min = this.tree.data;

    function ob(tr) {
      if(tr !== null) {
        ob(tr.left);
        if(min > tr.data) min = tr.data;
        ob(tr.right);
      }
    }

    ob(this.tree);

    return min;
  }

  max() {
    let max = this.tree.data;

    function ob(tr) {
      if(tr !== null) {
        ob(tr.left);
        if(max < tr.data) max = tr.data;
        ob(tr.right);
      }
    }

    ob(this.tree);

    return max;
  }
}

module.exports = {
  BinarySearchTree
};