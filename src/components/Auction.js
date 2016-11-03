import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveAuctionById } from '../actions/auctions';

class Auction extends Component {

  componentDidMount() {
    this.props.retrieveAuctionById(this.props.id);
  }

  render() {
    if (this.props.auction.id) {
      return (
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-info">
              <div className="panel-heading">{this.props.auction.auctionName}</div>
              <table className="table">
                <thead>
                <tr>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Auction Start</th>
                  <th>Auction End</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{this.props.auction.description}</td>
                  <td>{this.props.auction.location}</td>
                  <td>{this.props.auction.auctionStart}</td>
                  <td>{this.props.auction.auctionEnd}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-12">
            <div className="panel panel-info">
              <div className="panel-heading">Auction Items</div>
              <table className="table">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Starting Price</th>
                  <th>Minimum Bid</th>
                </tr>
                </thead>
                <tbody>
                {this.props.auction.items.map((item) => {
                  return (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.startingPriceUnits}</td>
                      <td>{item.minimumBidIncrease}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    return <span>loading</span>
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveAuctionById: (id) => {
      return dispatch(retrieveAuctionById(id))
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.auctionId,
    auction: state.selectedAuction
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auction);