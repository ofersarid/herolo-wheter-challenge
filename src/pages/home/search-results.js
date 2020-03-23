import React, { PureComponent } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import autoBind from 'auto-bind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './styles.scss';
import { search } from '../../services';
import PropTypes from 'prop-types';

class SearchResults extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  addParamToURL(locationKey) {
    const { history } = this.props;
    history.push(`/home/${locationKey}`);
  }

  render() {
    const { searchResults } = this.props;
    return (
      <ul className={cx(styles.searchResults)} >
        {searchResults.map(itm => (
          <li key={itm.get('Key')} onClick={ () => this.addParamToURL(itm.get('Key'))}>
            <span className={styles.country} >{itm.getIn(['Country', 'EnglishName'])}</span >
            <span className={styles.divider} >/</span >
            <span className={styles.city} >{itm.getIn(['EnglishName'])}</span >
          </li >
        ))}
      </ul >
    );
  }
};

SearchResults.propTypes = {
  searchResults: ImmutablePropTypes.list,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  searchResults: search.selectors.results(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SearchResults);
