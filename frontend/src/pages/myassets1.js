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
console.log(userAssets)
var sum = 0;

for(var i=0; i < userAssets.length; i++){

    sum += parseInt(userAssets[i].amount);
}


  return (
    <Page title="Dashboard: My Funds History">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Asset History
            <div>
              <div class="tsum">Total Assets Sum: <span>{sum+'USDT'}</span></div>

              <div className='row'>
                
                {userAssets.map((asset) => (
                  
                  <div  className='col-md-6'>
                      <div className="asset-list-cont" key={asset._id}>
                        <ul>
                          <li>Assets Amount: {asset.amount}</li>
                          <li>Assets Daily Profit: {asset.dailyprofit+ "USDT"}</li>
                          <li>Assets Status: {asset.status}</li>
                          <li className="text-capitalize">Assets Type: {asset.assettype + " usdt"}</li>
                          <li>Assets Daily Profit Ratio: {asset.assetdailyprofitratio +'%'}</li>
                          <li>Assets Mininum Investment Window: {asset.minassetduration+'s'+" (24Hours)"}</li>
                          <li>Assets Wallet Address: {asset.assetaddress}</li>
                        </ul>
                    </div>
                  </div>
                ))}
                
              </div>

              <div className="link-sect">
                <ul>
                    <li><a href={`/dashboard/assetshistory/${userDetails.username}`}>Assets History</a></li>
                    <li><a href={`/dashboard/withdrawals/${userDetails.username}`}>Withdraw History</a></li>
                    <li><a href={`/dashboard/addasset/${userDetails.username}`}>Add Asset</a></li>
                </ul>
              </div>
            </div>
          </Typography>
          
        </Stack>

        
      </Container>
    </Page>
  );
}