import React, {Component} from 'react';
import Spinner from './Spinner';
import '../App.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';



class Articles extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      isLoading: true
    }
  }

  componentDidMount() {
    fetch('/api/articles')
    .then(res => res.json())
    .then(articles => this.setState({articles, isLoading: false}, () => console.log('Articles Fetched!', articles)))
  }



  render() {
  console.log(this.state.articles);
    return(
      <div>
        <Container>
          <h2>Fetching Articles</h2>
          {
            (this.state.isLoading === true)
            ?  <Spinner /> : "Done!"
          }
          <Row>
            {this.state.articles.map(article =>
            <Col s={12} md={12} lg={12}>
              <Card style={{color: 'black', margin: '20px'}}>
                <Card.Header>{article.title}</Card.Header>
                <Card.Body>
                  <p className="autor">{article.autor}</p>
                  <p className="hora">Hora: {article.hora}</p>
                  <Card.Text>
                  {article.texto.map(text => 
                  <p>{text}<br /></p>
            )}
                  </Card.Text>
            
            
            </Card.Body>
            </Card>
            </Col>
            )}
            </Row>
          </Container>
      </div>
      
    )
  }
}

export default Articles;