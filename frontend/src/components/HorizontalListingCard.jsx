import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import Styles
import './HorizontalListingCard.css';

// Import Material UI Styles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteOutlineOutlined } from '@mui/icons-material';

const HorizontalListingCard = props => {
  const { listing, handleDeleteClick } = props;

  const [open, setOpen] = useState(false);

  const address = `${listing.address.city}, ${listing.address.province}, ${listing.address.postal_code}`;
  const descLength = listing.description.length;
  const maxLength = 250;

  const handleModalClickOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <div className='card mb-2'>
      <div className='card-body'>
        <h5 className='card-title'>{listing.title}</h5>
        <div className='row'>
          <div className='col-lg-2 image-box'>
            <img
              src={listing.images[0]}
              className='rounded img-fluid horiz-image'
              alt='Main'
            />
          </div>
          <div className='card-text col-lg-5'>
            {descLength > maxLength
              ? listing.description.substring(0, 200) + '  . . .'
              : listing.description}
          </div>

          <div className='card-text col-lg-3'>
            <strong>Price: </strong>D: <em>${listing.price.daily}</em>, W:{' '}
            <em>${listing.price.weekly}</em>, M:{' '}
            <em>${listing.price.monthly}</em>
            <br />
            <strong>Instrument Type: </strong>
            {listing.instrument_type}
            <br />
            <strong>Brand: </strong>
            {listing.brand}
            <br />
            <strong>Address: </strong>
            {address}
          </div>
          <div className='col-lg-2'>
            <div
              className='row'
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Link
                to={'/listings/' + listing._id}
                className='btn btn-sm btn-outline-dark col-lg-5 mx-1 mb-1'
              >
                View Ad
              </Link>
            </div>
            <div className='row centerButtons'>
              <a
                href={'https://www.google.com/maps/place/' + address}
                className='btn btn-sm btn-outline-dark col-lg-5 mx-1 mb-1'
              >
                View Map
              </a>
            </div>
            {/*<div className='row centerButtons'>
               <a
                href='/user'
                onClick={() => handleDeleteClick(listing._id)}
                className='btn btn-outline-dark col-lg-5 mx-1 mb-1 deleteButton'
              >
                <DeleteOutlineOutlined />
              </a> */}
            <div className='row centerButtons'>
              <Link
                to={'/user'}
                // onClick={() => handleDeleteClick(listing._id)}
                onClick={handleModalClickOpen}
                className='btn btn-outline-dark col-lg-5 mx-1 mb-1 deleteButton'
              >
                <DeleteOutlineOutlined />
              </Link>
              {/* <Button variant='outlined' onClick={handleModalClickOpen}>
                  Open alert dialog
                </Button> */}
              <Dialog
                open={open}
                onClose={handleModalClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  {'Are you sure you want to delete this listing?'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    className='delete-modal'
                    id='alert-dialog-description'
                  >
                    <h4 className='my-4 delete-modal'>{listing.title}</h4>
                    <div className='image-modal'>
                      <img
                        src={listing.images[0]}
                        className='rounded img-fluid horiz-image'
                        alt='Main'
                      />
                    </div>
                    <div className='mt-4 delete-modal'>
                      {descLength > maxLength
                        ? listing.description.substring(0, 200) + '  . . .'
                        : listing.description}
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <button
                    className='btn btn-outline-dark'
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDeleteClick(listing._id)}
                  >
                    Delete
                  </button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default HorizontalListingCard;
