import React, {Component} from "react"
import "./App.css"
import forkMe from "./left-graphite@2x.png"

import {Card, TextField} from "material-ui"
import MagicCard from "./MagicCard"

class App extends Component {
    constructor(props) {
        super(props)
        const mtgjson = require("./AllCards-x.json")
        this.state = {
            searchText: "Modern Knight First Strike", items: [], limit: 100
        }
        for (const item in mtgjson) {
            const x = mtgjson[item]
            this.state.items.push(x)
        }
    }

    render() {
        var found = 0
        const search = this.state.searchText.toLowerCase().split(" ").filter(x => x.trim() != "")
        const arr =
            this.state.items.filter((a, i) => {
                if (a.layout !== "normal")
                    return false // no vanguard, planes, schemes, ...
                const ok =
                    search.filter(part =>
                        a.name.toLowerCase().indexOf(part) >= 0
                        || (a.type && a.type.toLowerCase().indexOf(part) >= 0)
                        || (a.type && a.type.toLowerCase().indexOf(part) >= 0)
                        || (a.text && a.text.toLowerCase().indexOf(part) >= 0)
                        || (a.legalities && a.legalities.findIndex(x =>
                        x.legality === "Legal" && x.format.toLowerCase().indexOf(part) >= 0
                        ) >= 0)
                    ).length === search.length
                if (ok) {
                    found++
                }
                return ok && found <= this.state.limit
            })
        const limit = () =>
            <div>
                <span>Limit to items: </span>
                <TextField id="limit" onChange={event =>
                    this.setState(Object.assign({}, this.state, {limit: event.target.value}))
                } defaultValue={this.state.limit}/>
            </div>

        // <Button color="default" href="https://franticsearch.github.io">franticsearch.github.io</Button>
        return (
            <div className="App">
                <header className="App-header">
                    <div style={{position: "absolute", left: "0px", top: "0px"}}>
                        <a href="https://github.com/broxp/franticsearch">
                            <img src={forkMe} width={100} height={100}/>
                        </a>
                    </div>
                    <h1 className="App-title">
                        Welcome to Frantic Search, a Full Text Search over all Magic cards.
                    </h1>
                    <span>Search in name, text, type, legal format: </span>
                    <TextField id="searchText" onChange={event =>
                        this.setState(Object.assign({}, this.state, {searchText: event.target.value}))
                    } defaultValue={this.state.searchText}/>
                </header>
                <p className="App-intro">
                    <div>
                        {arr.map(x =>
                            <MagicCard item={x}/>
                        )}
                        {found >= this.state.limit ?
                            <div align="center">
                                <Card style={{width: "50%", padding: "4px"}}>
                                    <div>
                                        <h3>
                                            There are more results, increase the limit to see them.
                                        </h3>
                                        {limit()}
                                    </div>
                                </Card>
                            </div> : <span/>}
                    </div>
                </p>
            </div>
        )
    }
}

/*
<footer>
    <div>
        <Button color="primary" href="https://franticsearch.github.io">Hosted at franticsearch.github.io</Button>
        <span> | </span>
        <Button color="primary" href="http://mtgjson.com">Powered by mtgjson.com database</Button>
        <span> | </span>
        <Button color="primary" href="http://gatherer.wizards.com">Powered by gatherer.wizards.com images</Button>
    </div>
</footer>
 */

export default App
