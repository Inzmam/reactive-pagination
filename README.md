# reactive-pagination

**React Component to provide pagination for your application.** It comes with not just a basic layout but also provides some built in custom designs for your application.

[![NPM](https://img.shields.io/npm/v/reactive-pagination.svg)](https://www.npmjs.com/package/reactive-pagination) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```bash
npm install reactive-pagination --save
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
        styling="default"
      />
    );
  }
}
```

### Params

| Name              | Type     | Default | Required | Description                                                                                                                    |
| ----------------- | -------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| activePage        | Number   | 1       | **True** | Currently Active Page in Pagination                                                                                            |
| totalItemsCount   | Number   |         | **True** | Total count of items which you are going to display                                                                            |
| onChange          | Function |         | **True** | Page change handler function. Receives pageNum as argument.                                                                    |
| itemsCountPerPage | Number   | 10      | False    | Total items to display in single page                                                                                          |
| delimeter         | Number   | 5       | False    | Number of pages in paginator, excluding navigation blocks (prev, next, first, last pages)                                      |
| styling           | String   | default | False    | Defines different style guides for pagination. Possible params are: **default, borderless, primary, rounded, rounded_primary** |

## Examples

- #### Default
  ![alt text](https://image.prntscr.com/image/u-d2hlkjSVK2zANmIPTK2g.png)
- #### Borderless
  ![alt text](https://image.prntscr.com/image/KVw0KOXjRiGWrtOsFrf1XQ.png)
- #### Primary
  ![alt text](https://image.prntscr.com/image/rwdNmpiJSja4LsjbI2o0Zg.png)
- #### Rounded
  ![alt text](https://image.prntscr.com/image/SM-gE2cNSkmsvdDhHMJm3A.png)
- #### Rounded Primary
  ![alt text](https://image.prntscr.com/image/HfDgaBXlRZqIq-UwU0C4_Q.png)

## License

MIT © [](https://github.com/)
**Free Software, Hell Yeah!**
