import Graph from 'graphology'

export default {
  fetch: (req, env) => {
    // get durable object
    // const ip = req.headers.get('cf-connecting-ip')
    const { hostname, pathname } = new URL(req.url)
    const stub = env.GRAPH.get(env.GRAPH.idFromName(hostname + pathname))

    // fetch durable object
    return stub.fetch(req)
  }
}

export class DataGraph {
  constructor(state, env) {
    this.state = state
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      let stored = await this.state.storage.get('value')
      // After initialization, future reads do not need to access storage.
      this.graph = stored || new Graph()
    })
  }

  // Handle HTTP requests from clients.
  async fetch(req) {
    const url = new URL(req.url)

    for (const [key, value] of url.searchParams.entries()) {
      console.log(`${key}, ${value}`)
      switch (key) {
        case 'newNode':
          const nAttrs = value.split('|')
          nAttrs.length == 1 ? this.graph.addNode(value) : this.graph.addNode(nAttrs[0], JSON.parse(nAttrs[1]))
          break
        case 'newEdge':
          const eNodes = value.split('-')
          console.log(eNodes)
          this.graph.addEdge(eNodes[0], eNodes[1])
          this.graph.addEdge(eNodes[1], eNodes[0])
          break
        case 'clear':
          this.graph.clear()
      }
    }

    // store the updated graph
    await this.state.storage.put('value', this.graph)
    const retval = {
      url: url.origin + url.pathname,
      //key: url.pathname.replace('/api/',''),
      nodes: this.graph ? this.graph.order : 0,
      edges: this.graph ? this.graph.size : 0,
      graph: this.graph ?? null,
    }
    return new Response(JSON.stringify(retval, null, 2), { headers: { 'content-type': 'application/json' } })
  }
}