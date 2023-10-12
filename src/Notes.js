import React from 'react';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cards:[], text:''};
  }

  componentDidMount() {
    this.cardsGet();
  }

  onChange({target}) {
    this.setState({[target.name]: target.value});
  }

  cardsGet(text='') {
    fetch(this.props.backend)
      .then(resp => resp.json())
      .then(json => this.setState({cards: Array.from(json), text: text}))
      .catch(error => console.log('Server error:', error));
  }

  cardCreate() {
    fetch(this.props.backend, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({content: this.state.text}),
    })
      .then(resp => this.cardsGet())
      .catch(error => console.log('Server error:', error));
  }

  cardRemove(id) {
    fetch(this.props.backend + id, { method: 'DELETE' })
      .then(resp => this.cardsGet(this.state.text))
      .catch(error => console.log('Server error:', error));
  }

  render() {
    return (
      <div className='body'>
        <span className='header'>Notes </span>
        <button className='btn-reload' onClick={() => this.cardsGet()}>⇅</button>
        <div className='card-list'>
          {this.state.cards.map(card =>
            <div key={card.id} className='card'>
              <pre>{card.content}</pre>
              <div className='btn-close' onClick={() => this.cardRemove(card.id)}>X</div>
            </div>
          )}
        </div>
        <div className='card-new'>
          <label>
            <div style={{marginBottom: '.5em'}}>New Note</div>
            <textarea className='text' name='text' rows='5' value={this.state.text} onChange={evt => this.onChange(evt)}></textarea>
          </label>
          <button className='btn-send' onClick={() => this.cardCreate()}>➤</button>
        </div>
      </div>
    );
  }
}
