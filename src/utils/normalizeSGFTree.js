import { normalize, Schema, arrayOf } from 'normalizr'

const Node = new Schema('nodes')
Node.define({
  parent: Node,
  childs: arrayOf(Node),
})

function markNodes(tree) {
  let id = 0

  function walk(current, parent) {
    current.id = id++
    if (typeof parent !== 'undefined') {
      current.parent = parent
    }
    current.childs.forEach(child => walk(child, current.id))
  }

  walk(tree)
}

export default function normalizeSGFTree(tree) {
  markNodes(tree)
  return normalize(tree, Node).entities.nodes
}
