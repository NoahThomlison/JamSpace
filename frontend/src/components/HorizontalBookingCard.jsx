import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import Styles
import './HorizontalListingCard.css';

// Import Material UI Styles
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteOutlineOutlined } from '@mui/icons-material';

const HorizontalBookingCard = props => {
  const { booking, handleDeleteClick } = props;

  const [open, setOpen] = useState(false);

  const descLength = booking.listing_desc.length;
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
        <h5 className='card-title'>{booking.listing_title}</h5>
        <div className='row'>
          <div className='col-lg-2 image-box'>
            <img
              src={booking.listing_image}
              className='rounded img-fluid horiz-image'
              alt='Main'
            />
          </div>
          <div className='card-text col-lg-5'>
            {descLength > maxLength
              ? booking.listing_desc.substring(0, 200) + '  . . .'
              : booking.listing_desc}
          </div>

          <div className='card-text col-lg-3'>
            {booking.first_day} - {booking.last_day}
            <br />
            <strong>Days: </strong>
            {booking.days}
            <br />
            <strong>Rental Fee: </strong>
            {booking.cost}
            <br />
            <strong>Security Deposit: </strong>
            {booking.deposit}
            <br />
            <strong>Total Cost: </strong>
            {booking.total}
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
                to={'/listings/' + booking.listing_id}
                className='btn btn-sm btn-outline-dark col-lg-5 mx-1 mb-1'
              >
                View Ad
              </Link>
            </div>
            {/* <div className='row centerButtons'>
              <a
                href={'https://www.google.com/maps/place/' + booking.address}
                className='btn btn-sm btn-outline-dark col-lg-5 mx-1 mb-1'
              >
                View Map
              </a>
            </div> */}
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
                    <h4 className='my-4 delete-modal'>
                      {booking.listing_title}
                    </h4>
                    <div className='image-modal'>
                      <img
                        src={booking.listing_image}
                        className='rounded img-fluid horiz-image'
                        alt='Main'
                      />
                    </div>
                    <div className='mt-4 delete-modal'>
                      {descLength > maxLength
                        ? booking.listing_desc.substring(0, 200) + '  . . .'
                        : booking.listing_desc}
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
                    // onClick={() => handleDeleteClick(listing._id)}
                    onClick={handleModalClose}
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

export default HorizontalBookingCard;
