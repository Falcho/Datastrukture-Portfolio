class Node {
  constructor(value = null) {
    this.parent = null; // reference til parent-node
    this.childNodes = []; // liste over children
    this.value = value; // data/value i noden
  }

  firstChild() {
    return this.childNodes.length ? this.childNodes[0] : null;
  }

  lastChild() {
    //returner sidste child i childNodes
    return this.childNodes.length
      ? this.childNodes[this.childNodes.length - 1]
      : null;
  }

  hasChildNodes() {
    //returner true/false afhængigt af om der er children
    return this.childNodes.length > 0 ? true : false;
  }

  appendChild(child) {
    //tilføj child til childNodes og opdatér parent på child
    this.childNodes.push(child);
    child.parent = this;
  }

  removeChild(child) {
    //fjern child fra childNodes og nulstil parent på child
    const index = this.childNodes.indexOf(child);
    if (index > -1) {
      this.childNodes.splice(index, 1);
      child.parent = null;
    }
  }

  replaceChild(newChild, oldChild) {
    //erstat oldChild med newChild i childNodes og opdatér parent refs
    const index = this.childNodes.indexOf(oldChild);
    if (index > -1) {
      this.childNodes[index] = newChild;
      oldChild.parent = null;
      newChild.parent = this;
    }
  }
}

class Tree {
  constructor(rootValue = null) {
    // root er en Node (eller null hvis træet er tomt)
    this.root = rootValue !== null ? new Node(rootValue) : null;
  }

  printTree() {
 // Print the tree in a nice way - by creating a (jagged) 2D array of the tree
    // each level (starting from root) is an array in the array that doubles in size from the previous level

    // breaks if the tree is too deep - but that's a problem for another day

    // Use DFS to fill array with values
    const treeArray = [];
    let height = 0; // and while we're at it, calculate the height of the tree
    buildTreeArray(this.root, 0, 0);

    // Does a Depth-First-Scan of the Tree,
    // keeping track of the current depth (how far down from the top)
    // and the current indent (how far right from the (possible) left-most node at this depth)
    // stores the node values in a 2D array
    function buildTreeArray(node, depth, indent) {
      if (!node) {
        return;
      }
      height = Math.max(height, depth);
      // insert this node value in the 2D array
      if (!treeArray[depth]) treeArray[depth] = [];
      treeArray[depth][indent] = node.value;
      // visit its children - remember to double indent
      buildTreeArray(node.left, depth + 1, indent * 2);
      buildTreeArray(node.right, depth + 1, indent * 2 + 1);
    }

    // Apparently I'm not smart enough to calculate these, so here's a pre-calculated list
    const indentations = [1, 2, 5, 11, 23, 46, 93];

    let treeString = " ";
    // Display array - one level at a time
    for (let depth = 0; depth < treeArray.length; depth++) {
      const values = treeArray[depth];

      // Calculate indent for this depth (or find it in the pre-calculated table)
      let currentHeight = height - depth; // currentHeight is the distance from the bottom of the tree
      let indent = indentations[currentHeight];

      // Only display tree structure if we are not at the top
      if (depth > 0) {
        // Loop through half the values - and show a subtree with left and right
        for (let i = 0; i < values.length / 2; i++) {
          treeString += " ".repeat(indent);
          // Only show sub-tree if there are some values below
          if (values[i * 2] != undefined || values[i * 2 + 1] != undefined) {
            treeString += "┌";
            treeString += "─".repeat(indent > 1 ? indent : 0);
            treeString += "┴";
            treeString += "─".repeat(indent > 1 ? indent : 0);
            treeString += "┐";
          } else {
            treeString += "   " + "  ".repeat(indent > 1 ? indent : 0);
          }
          treeString += " ".repeat(indent);
          // add a single space before the next "block"
          treeString += " ";
        }
        // and finalize the current line
        treeString += "\n";
      }

      // Indent numbers one less than their "tree drawings"
      // Unless it is the first one, then it is two (or maybe three) less ... mystic math!
      if (depth == 0) {
        treeString += " ".repeat(indent - 2);
      } else {
        treeString += " ".repeat(indent - 1);
      }

      // display values
      for (let i = 0; i < values.length; i++) {
        // if both children are undefined, don't show any of then
        // if only one child is, show it as underscores _
        const showUndefined =
          !values[i - (i % 2)] && !values[i - (i % 2) + 1] ? " " : "_";
        // if depth is lowest (height-1) - pad values to two characters
        if (depth == height) {
          treeString += String(values[i] ?? showUndefined.repeat(2)).padStart(
            2,
            " "
          );
          // and add a single space
          treeString += " ";
        } else {
          // otherwise center values in block of three
          treeString += String(values[i] ?? showUndefined.repeat(3))
            .padEnd(2, " ")
            .padStart(3, " ");

          // and add twice the indentation of spaces + 1 in the middle
          treeString += " ".repeat(indent - 1);
          treeString += " ";
          treeString += " ".repeat(indent - 1);
        }
      }

      // finalize the value-line
      treeString += "\n";
    }

    console.log(treeString);
  }

  dumb(){
    this.printTree();
  }
  

  addValue(value) {
    //opret ny Node med value og indsæt et sted i træet
    // fx som child til root eller lign.
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.root.appendChild(newNode);
    }
  }

  findValue(value) {
    //der leder efter den givne value i træet, og returnerer den (første) Node der har den
    function findInNode(node, value) {
      if (node.value === value) {
        return node;
      }
        for (const child of node.childNodes) {
          const found = findInNode(child, value);
          if (found) {
            return found;
          }
        }
        return null;
      }
    return this.root ? findInNode(this.root, value) : null;

  }

  removeValue(value) {
    //der finder og fjerner Noden med den givne value fra træet
    const nodeToRemove = this.findValue(value);
    if (nodeToRemove && nodeToRemove.parent) {
      nodeToRemove.parent.removeChild(nodeToRemove);
    } else if (nodeToRemove === this.root) {
      this.root = null; // hvis roden skal fjernes, sæt træet til tomt
    }
  }
}
