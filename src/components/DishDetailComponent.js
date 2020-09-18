import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';

    function RenderDish({dish}){
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
    function RenderComments({comments}){
        const commentsList = comments.map((c) => {
            return(
                <ul className="list-unstyled">
                    <li>{c.comment}</li>
                    <li>-- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</li>
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
    const DishDetail= (props) =>{
        if(props.selectedDish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.selectedDish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.selectedDish.comments} />
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }

export default DishDetail;