import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import styles from "./pagination_styles.css";

class Pagination extends Component {
  static defaultProps = {
    activePage: 1,
    itemsCountPerPage: 10,
    delimeter: 5,
  };

  static propTypes = {
    activePage: PropTypes.number,
    itemsCountPerPage: PropTypes.number,
    totalItemsCount: PropTypes.number,
    delimeter: PropTypes.number,
  };

  constructor(props) {
    super(props);
    const { itemsCountPerPage, totalItemsCount, delimeter } = this.props;

    let extra_page_exists = false;
    if (totalItemsCount % itemsCountPerPage !== 0) {
      extra_page_exists = true;
    }

    let page_count = parseInt(totalItemsCount / itemsCountPerPage);
    if (extra_page_exists) {
      page_count += 1;
    }

    this.state = {
      page_count: page_count,
      extra_page_exists: extra_page_exists,
      delimeter: delimeter,
    };
  }

  handleChange = (event, params) => {
    event.preventDefault();
    const { onChange, activePage } = this.props;
    const { page_count } = this.state;

    // If any specific page button is clicked
    if (params.pageNum != null) {
      onChange(params.pageNum);
    } else if (params.pageNum === null) {
      if (params.prev === true) {
        if (activePage === 1) {
          // Do not move to previous page
        } else {
          // Go to previous page
          onChange(activePage - 1);
        }
      } else if (params.next === true) {
        if (activePage === page_count) {
          // Do not move to next page
        } else {
          // Go to next page
          onChange(activePage + 1);
        }
      }
    }
  };

  pages_less_than_delimeter = () => {
    const { page_count } = this.state;

    let starting_index = 1;
    let ending_index = page_count;

    return [starting_index, ending_index];
  };

  pages_more_than_delimeter = () => {
    const { activePage } = this.props;
    const { page_count, delimeter } = this.state;

    let starting_index = 1;
    let ending_index = 0;

    if (activePage > delimeter) {
      starting_index = activePage - (delimeter - 2);
    }

    if (activePage > delimeter) {
      if (activePage === page_count) {
        starting_index = activePage - (delimeter - 1);
        ending_index = page_count;
      } else {
        ending_index = activePage + 1;
      }
    } else {
      ending_index = delimeter;
    }

    return [starting_index, ending_index];
  };

  calculate_start_end_indexes = () => {
    const { page_count } = this.state;

    let [starting_index, ending_index] = [1, page_count];

    if (page_count > 5) {
      // calculate page blocks that are greater than given number
      [starting_index, ending_index] = this.pages_more_than_delimeter();
    } else if (page_count < 5) {
      [starting_index, ending_index] = this.pages_less_than_delimeter();
    }

    return [starting_index, ending_index];
  };

  render_pagination_items = () => {
    const { activePage } = this.props;

    let self = this;
    let pagination_items = [];

    let [starting_index, ending_index] = this.calculate_start_end_indexes();

    for (let i = starting_index; i <= ending_index; i++) {
      pagination_items.push(
        <li
          className={
            styles.page_item + " " + (activePage === i ? styles.active : "")
          }
          key={i}
          onClick={(event) =>
            self.handleChange(event, {
              pageNum: i,
              prev: null,
              next: null,
            })
          }
        >
          <a href="#" className={styles.page_link}>
            {i}
          </a>
        </li>
      );
    }

    return pagination_items;
  };

  render_pagination = () => {
    const { page_count } = this.state;
    let pagination_html = (
      <Fragment>
        <ul className={styles.pagination}>
          <li className={styles.page_item}>
            <a
              href="#"
              className={styles.page_link}
              aria-label="Last"
              onClick={(event) =>
                this.handleChange(event, {
                  pageNum: 1,
                  prev: null,
                  next: null,
                })
              }
            >
              <span aria-hidden="true">«</span>
              <span className={styles.sr_only}>First</span>
            </a>
          </li>

          <li className={styles.page_item}>
            <a
              href="#"
              className={styles.page_link}
              aria-label="Previous"
              onClick={(event) =>
                this.handleChange(event, {
                  pageNum: null,
                  prev: true,
                  next: null,
                })
              }
            >
              <span aria-hidden="true">‹</span>
              <span className={styles.sr_only}>Previous</span>
            </a>
          </li>
          {this.render_pagination_items()}
          <li className={styles.page_item}>
            <a
              href="#"
              className={styles.page_link}
              aria-label="Next"
              onClick={(event) =>
                this.handleChange(event, {
                  pageNum: null,
                  prev: null,
                  next: true,
                })
              }
            >
              <span aria-hidden="true">›</span>
              <span className={styles.sr_only}>Next</span>
            </a>
          </li>

          <li className={styles.page_item}>
            <a
              href="#"
              className={styles.page_link}
              aria-label="Last"
              onClick={(event) =>
                this.handleChange(event, {
                  pageNum: page_count,
                  prev: null,
                  next: null,
                })
              }
            >
              <span aria-hidden="true">»</span>
              <span className={styles.sr_only}>Last</span>
            </a>
          </li>
        </ul>
      </Fragment>
    );

    return pagination_html;
  };

  render() {
    return <Fragment>{this.render_pagination()}</Fragment>;
  }
}

export default Pagination;
