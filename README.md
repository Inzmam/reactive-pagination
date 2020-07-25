# reactive-pagination

> Pagination Module for react js application

[![NPM](https://img.shields.io/npm/v/reactive-pagination.svg)](https://www.npmjs.com/package/reactive-pagination) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save reactive-pagination
```

## Usage

```jsx
import React, { Component } from "react";

import Pagination from "reactive-pagination";
import "reactive-pagination/dist/index.css";

class Example extends Component {
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
      <Pagination
        activePage={activePage}
        itemsCountPerPage={10}
        totalItemsCount={400}
        delimeter={10}
        onChange={this.handlePageChange}
      />
    );
  }
}
```

## License

MIT © [](https://github.com/)
