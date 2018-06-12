import React, {Component} from "react"
import "./App.css"
import {Card} from "material-ui"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

class MagicCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const item = this.props.item
        const urlName = item.name.replace(" ", "%20")
            .replace(" (a)", "")
            .replace(" (b)", "")
            .replace(" (c)", "")
            .replace(" (d)", "")
            .replace(" (e)", "")
            .replace(" (f)", "")
        const url = "http://gatherer.wizards.com/Handlers/Image.ashx?type=card&name=" + urlName
        return <Card style={{display: "inline-block", margin: "4px"}}>
            <CardContent>
                <Typography color="textSecondary">
                    {item.name}
                </Typography>
                <Typography variant="headline" component="h2">
                    <img width="223" height="311" alt={item.name} src={url}/>
                </Typography>
            </CardContent>
        </Card>
    }

    /*
     {item.manaCost}
    <Typography color="textSecondary">
    {item.type}
    </Typography>
    <Typography component="p">
    {item.text}
    </Typography>
    */
}

/*<CardActions><Button size="small">Learn More</Button></CardActions>*/

export default MagicCard