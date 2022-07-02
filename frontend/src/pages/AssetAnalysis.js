import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function MyAssets() {
  
  const userDetails = JSON.parse(localStorage.getItem('userInfo'));
  const userAssets = JSON.parse(localStorage.getItem('assetdetails'));
  const [userid] = useState(userDetails._id);

  useEffect(() => {
    // Update the document title using the browser API
    getAssetDetails();
  });

  const getAssetDetails = async (e) => {
  

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }  

      const {data} = await axios.post("/api/users/assetdetails", {
        userid
      }, config);
      localStorage.setItem("assetdetails", JSON.stringify(data.asset))
    } catch (error) {
      console.log(error.response.data)
    }

}

var sum = 0;

for(var i=0; i < userAssets.length; i++){

    sum += parseInt(userAssets[i].amount);
}


  return (
    <Page title="Dashboard: My Funds History">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Asset Analysis
            <div>
              <div className="link-sect">
                <div className='row'>
                    <div className="col-md-4"><a href={`/dashboard/assetshistory/${userDetails.username}`}>Assets History</a></div>
                    <div className="col-md-4"><a href={`/dashboard/withdrawals/${userDetails.username}`}>Withdraw History</a></div>
                    <div className="col-md-4"><a href={`/dashboard/addasset/${userDetails.username}`}>Add Asset</a></div>
                    <div className="col-md-4"><a href={`/dashboard/assetshistory/${userDetails.username}`}>Assets History</a></div>
                    <div className="col-md-4"><a href={`/dashboard/withdrawals/${userDetails.username}`}>Withdraw History</a></div>
                    <div className="col-md-4"><a href={`/dashboard/addasset/${userDetails.username}`}>Add Asset</a></div>
                </div>
              </div>
            </div>
          </Typography>
          
        </Stack>

        
        {/* <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid> */}
      </Container>
    </Page>
  );
}
