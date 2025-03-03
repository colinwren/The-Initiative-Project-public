import React from 'react';
import ActiveCharacterList from '../ActiveCharacters/ActiveCharacterList.jsx';
import './Encounter.css';

class Encounter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.encounters[this.props.activeEncounter]);
    return (
      <div className="encounterWrapper">
        <div className="encounterWrapperHeader">
          <div className="encounter-left-col-buttons">
            <span className="save-button">
              <button onClick={this.props.saveEncounter}>
                <img
                  width="20"
                  height="20"
                  src="https://s3.amazonaws.com/the-initiative-project/save.svg"
                />
              </button>
            </span>
            <span className="create-button" onClick={this.props.createNewEncounter}>+</span>
          </div>
          <h1>
            {this.props.encounters[this.props.activeEncounter]
              ? this.props.encounters[this.props.activeEncounter].encounterName
              : 'Main encounter'}
          </h1>
          <span className="next-button">
            <button onClick={this.props.sort}>
              <img
                width="20"
                height="20"
                src="https://s3.amazonaws.com/the-initiative-project/sort.svg"
              />
            </button>
            <button onClick={this.props.switchTurn}>
              <img
                width="20"
                height="20"
                src="https://s3.amazonaws.com/the-initiative-project/play.svg"
              />
            </button>
          </span>
        </div>
        <ActiveCharacterList
          onDragEnd={this.props.onDragEnd}
          encounter={this.props.encounters[this.props.activeEncounter]}
          partyMembers={this.props.partyMembers}
          addActorToEncounter={this.props.addActorToEncounter}
          deleteActorFromEncounter={this.props.deleteActorFromEncounter}
          handleInputChange={this.props.handleInputChange}
          editActorFromEncounter={this.props.editActorFromEncounter}
          healActor={this.props.healActor}
          damageActor={this.props.damageActor}
        />
      </div>
    );
  }
}

export default Encounter;
