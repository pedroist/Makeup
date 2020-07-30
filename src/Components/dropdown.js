import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

class Dropdown extends React.Component {
  state = {
    selected: "All",
    isOpen: false,
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    const selected = this.props.selected;
    return (
      <div className="dropdown" onBlur={this.toggleOpen} onClick={this.toggleOpen}>
        <DropdownButton
          className="btn btn-secondary dropdown-toggle dropdown-button"
          type="button"
          title={this.props.selected}
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          Dropdown
        </DropdownButton>
        <ul className={menuClass} aria-labelledby="dropdownMenuButton" >
          {this.props.list.map((item, i) =>
            <MenuItem key={i} className="dropdown-item" onMouseDown={() => this.props.onSelect(item.category, this.props.type)} >{item.name}</MenuItem>
          )}
        </ul>
      </div>
    );
  }
}

export default Dropdown;