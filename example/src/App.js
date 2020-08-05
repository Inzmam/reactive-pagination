import React, { Component, Fragment } from "react";

import Pagination from "reactive-pagination";
import "reactive-pagination/dist/index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handlePageChange = (pageNum) => {
    this.setState({
      activePage: pageNum,
    });
  };

  render() {
    const { activePage } = this.state;

    return (
      <Fragment>
        <h2> This is a damn real component and below it is my package </h2>
        <p> Default </p>
        <Pagination
          activePage={activePage}
          // itemsCountPerPage={10}
          totalItemsCount={400}
          // delimeter={10}
          onChange={this.handlePageChange}
          styling="default"
        />

        <p> Borderless </p>
        <Pagination
          activePage={activePage}
          // itemsCountPerPage={10}
          totalItemsCount={400}
          // delimeter={10}
          onChange={this.handlePageChange}
          styling="borderless"
        />

        <p> Primary </p>
        <Pagination
          activePage={activePage}
          // itemsCountPerPage={10}
          totalItemsCount={400}
          // delimeter={10}
          onChange={this.handlePageChange}
          styling="primary"
        />

        <p> Rounded </p>
        <Pagination
          activePage={activePage}
          // itemsCountPerPage={10}
          totalItemsCount={400}
          // delimeter={10}
          onChange={this.handlePageChange}
          styling="rounded"
        />

        <p> Rounded Primary </p>
        <Pagination
          activePage={activePage}
          // itemsCountPerPage={10}
          totalItemsCount={400}
          // delimeter={10}
          onChange={this.handlePageChange}
          styling="rounded_primary"
        />

        <p> Any Wrong Name </p>
        <Pagination
          activePage={activePage}
          // itemsCountPerPage={10}
          totalItemsCount={400}
          // delimeter={10}
          onChange={this.handlePageChange}
          styling="any_wrong_name"
        />
      </Fragment>
    );
  }
}

export default App;
