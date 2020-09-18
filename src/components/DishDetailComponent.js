import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardBody, CardTitle, CardText} from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }
    renderDish(dish){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    renderComments(comments){
        const commentsList = comments.map((c) => {
            const d = new Date(c.date);
            const str = d.toDateString();
            return(
                <ul className="list-unstyled">
                    <li>{c.comment}</li>
                    <li>-- {c.author}, {str.slice(4, 10)}, {str.slice(11, 15)}</li>
                </ul>
            );
        });
        return(
            <div>
                <h4>Comments</h4>
                {commentsList}
            </div>
        );
    }
    render(){
        if(this.props.selectedDish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.selectedDish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(this.props.selectedDish.comments)}
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }
}

export default DishDetail;