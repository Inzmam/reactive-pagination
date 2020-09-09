import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import styles from "./pagination_styles.scss";

class Pagination extends Component {
  static defaultProps = {
    activePage: 1,
    itemsCountPerPage: 10,
    delimeter: 5,
    styling: "default",
  };

  static propTypes = {
    activePage: PropTypes.number,
    itemsCountPerPage: PropTypes.number,
    totalItemsCount: PropTypes.number,
    delimeter: PropTypes.number,
    styling: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { activePage, itemsCountPerPage, delimeter, styling } = this.props;

    this.state = {
      activePage: activePage,
      itemsCountPerPage: itemsCountPerPage,
      delimeter: delimeter,
      styling: styling,
      page_count: 0,
      extra_page_exists: false,
    };
  }

  calcualte_page_count = () => {
    const { itemsCountPerPage, totalItemsCount, delimeter } = this.props;

    let extra_page_exists = false;
    if (totalItemsCount % itemsCountPerPage !== 0) {
      extra_page_exists = true;
    }

    let page_count = 0;
    page_count = parseInt(totalItemsCount / itemsCountPerPage);
    if (extra_page_exists) {
      page_count += 1;
    }

    if (page_count === 0) {
      page_count = 1;
    }

    this.state = {
      page_count: page_count,
      extra_page_exists: extra_page_exists,
      delimeter: delimeter,
    };
  };

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
          <button className={styles.page_link}>{i}</button>
        </li>
      );
    }

    return pagination_items;
  };

  set_base_class = () => {
    const { styling } = this.props;
    let base_class = styles.pagination;

    if (styling === "default") {
      // Do Nothhing. Use default values
    } else if (styling === "rounded") {
      base_class = styles.rounded;
    } else if (styling === "borderless") {
      base_class = styles.borderless;
    } else if (styling === "primary") {
      base_class = styles.primary;
    } else if (styling === "rounded_primary") {
      base_class = styles.rounded_primary;
    }
    return base_class;
  };

  render_pagination = () => {
    const { page_count } = this.state;
    let base_class = this.set_base_class();
    let pagination_html = (
      <Fragment>
        <ul className={base_class}>
          <li className={styles.page_item}>
            <button
              className={styles.page_link_first}
              aria-label="Last"
              onClick={(event) =>
                this.handleChange(event, {
                  pageNum: 1,
                  prev: null,
                  next: null,
                })
              }
            >
              {this.render_first_arrow()}
              <span className={styles.sr_only}>First</span>
            </button>
          </li>

          <li className={styles.page_item}>
            <button
              className={styles.page_link_prev}
              aria-label="Previous"
              onClick={(event) =>
                this.handleChange(event, {
                  pageNum: null,
                  prev: true,
                  next: null,
                })
              }
            >
              {this.render_prev_arrow()}
              <span className={styles.sr_only}>Previous</span>
            </button>
          </li>
          {this.render_pagination_items()}
          <li className={styles.page_item}>
            <button
              className={styles.page_link_next}
              aria-label="Next"
              onClick={(event) =>
                this.handleChange(event, {
                  pageNum: null,
                  prev: null,
                  next: true,
                })
              }
            >
              {this.render_next_arrow()}
              <span className={styles.sr_only}>Next</span>
            </button>
          </li>

          <li className={styles.page_item}>
            <button
              className={styles.page_link_last}
              aria-label="Last"
              onClick={(event) =>
                this.handleChange(event, {
                  pageNum: page_count,
                  prev: null,
                  next: null,
                })
              }
            >
              {this.render_last_arrow()}
              <span className={styles.sr_only}>Last</span>
            </button>
          </li>
        </ul>
      </Fragment>
    );

    return pagination_html;
  };

  render_next_arrow = () => {
    const { styling } = this.props;
    let next_arrow_html = <></>;

    if (styling === "default") {
      next_arrow_html = (
        <>
          <span aria-hidden="true">›</span>
        </>
      );
    } else if (styling === "rounded_primary") {
      next_arrow_html = (
        <>
          <span aria-hidden="true">›</span>
        </>
      );
    } else if (styling === "borderless") {
      next_arrow_html = (
        <>
          <span aria-hidden="true">›</span>
        </>
      );
    } else if (styling === "primary") {
      next_arrow_html = (
        <>
          <span aria-hidden="true">›</span>
        </>
      );
    } else if (styling === "rounded") {
      next_arrow_html = (
        <>
          <span aria-hidden="true">
            <svg width="8" height="12">
              <path
                strokeWidth="1"
                stroke="#007bff"
                fill="none"
                d="M 0 0 L 7 6 L 0 12"
              ></path>
            </svg>
          </span>
        </>
      );
    } else {
      next_arrow_html = (
        <>
          <span aria-hidden="true">›</span>
        </>
      );
    }

    return next_arrow_html;
  };

  render_last_arrow = () => {
    const { styling } = this.props;
    let next_arrow_html = <></>;

    if (styling === "default") {
      next_arrow_html = (
        <>
          <span aria-hidden="true">»</span>
        </>
      );
    } else if (styling === "rounded_primary") {
      next_arrow_html = (
        <>
          <span aria-hidden="true">»</span>
        </>
      );
    } else if (styling === "borderless") {
      next_arrow_html = (
        <>
          <span aria-hidden="true">»</span>
        </>
      );
    } else if (styling === "primary") {
      next_arrow_html = (
        <>
          <span aria-hidden="true">»</span>
        </>
      );
    } else if (styling === "rounded") {
      next_arrow_html = (
        <>
          <span aria-hidden="true">
            <svg width="8" height="12">
              <path
                strokeWidth="1"
                stroke="#007bff"
                fill="none"
                d="M 7 0 L 7 12"
              ></path>
              <path
                strokeWidth="1"
                stroke="#007bff"
                fill="none"
                d="M 0 0 L 4 6 L 0 12"
              ></path>
            </svg>
          </span>
        </>
      );
    } else {
      next_arrow_html = (
        <>
          <span aria-hidden="true">»</span>
        </>
      );
    }

    return next_arrow_html;
  };

  render_first_arrow = () => {
    const { styling } = this.props;
    let prev_arrow_html = <></>;

    if (styling === "default") {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">«</span>
        </>
      );
    } else if (styling === "rounded_primary") {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">«</span>
        </>
      );
    } else if (styling === "borderless") {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">«</span>
        </>
      );
    } else if (styling === "primary") {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">«</span>
        </>
      );
    } else if (styling === "rounded") {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">
            <svg width="8" height="12">
              <path
                strokeWidth="1"
                stroke="#007bff"
                fill="none"
                d="M 1 0 L 1 12"
              ></path>
              <path
                strokeWidth="1"
                stroke="#007bff"
                fill="none"
                d="M 8 0 L 4 6 L 8 12"
              ></path>
            </svg>
          </span>
        </>
      );
    } else {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">«</span>
        </>
      );
    }

    return prev_arrow_html;
  };

  render_prev_arrow = () => {
    const { styling } = this.props;
    let prev_arrow_html = <></>;

    if (styling === "default") {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">‹</span>
        </>
      );
    } else if (styling === "rounded_primary") {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">‹</span>
        </>
      );
    } else if (styling === "borderless") {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">‹</span>
        </>
      );
    } else if (styling === "primary") {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">‹</span>
        </>
      );
    } else if (styling === "rounded") {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">
            <svg width="8" height="12">
              <path
                strokeWidth="1"
                stroke="#007bff"
                fill="none"
                d="M 8 0 L 1 6 L 8 12"
              ></path>
            </svg>
          </span>
        </>
      );
    } else {
      prev_arrow_html = (
        <>
          <span aria-hidden="true">‹</span>
        </>
      );
    }

    return prev_arrow_html;
  };

  render() {
    return (
      <Fragment>
        {this.calcualte_page_count()}
        {this.render_pagination()}
      </Fragment>
    );
  }
}

export default Pagination;
