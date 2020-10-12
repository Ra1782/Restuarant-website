import React, { Component } from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalBody, ModalHeader, Label, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleSubmit(values){
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
    render(){
        return(
            <div>
                <Button onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-12 col-md-8">
                            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col md={12}><Label htmlFor="rating">Rating</Label></Col>
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating" id="rating"className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}><Label htmlFor="author">Your Name</Label></Col>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author" 
                                            className="form-control"
                                            placeholder="Your Name"
                                            validators={{
                                                required, minLength: minLength(3), maxLength:maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required ',
                                                minLength: 'Must be greater than 2 characters ',
                                                maxLength: 'Must be 15 characters or less '
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}><Label htmlFor="comment">Comment</Label></Col>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment" 
                                            className="form-control" rows="6"/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10}}>
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
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
            <CommentForm />
        </div>
    );
}
const DishDetail= (props) =>{
    if(props.dish!=null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name }</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
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