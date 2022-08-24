A [Graphology](https://graphology.github.io/) Implementation using Cloudflare Worker Durable Objects.

```json
{
    "url": "https://my.workers.dev/myGraph",
    "key": "/myGraph",
    "nodes": 0,
    "edges": 0,
    "graph": {
        "options": {
            "type": "mixed",
            "multi": false,
            "allowSelfLoops": true
        },
        "attributes": { },
        "nodes": [ ],
        "edges": [ ]
    }
}
```

## Options

- `?newNode=nodeId|{"jsonAttr": "jsonValue"}` creates a new node with the ID and JSON value(s) provided.
- `?newEdge=nodeId-nodeId` creates a new edge between nodes with the IDs provided.
- `?clear` clears the graph of all nodes and edges.

## [🚀 We're hiring!](https://careers.do/apply)
[Driv.ly](https://driv.ly) is simple APIs to buy & sell cars online, funded by some of the [biggest names](https://twitter.com/TurnerNovak) in [automotive](https://fontinalis.com/team/#bill-ford) and [finance & insurance](https://www.detroit.vc)

We're building our entire infrastructure on Cloudflare Workers, Durable Objects, KV, R2, and PubSub.  If you're as passionate about these transformational technologies as we are, we'd love for you to join our rapidly-growing team.
