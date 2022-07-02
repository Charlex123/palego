import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { Table } from 'react-bootstrap';
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

  // scheduleWarning(time, triggerThis) {

  //   // get hour and minute from hour:minute param received, ex.: '16:00'
  //   const hour = Number(time.split(':')[0]);
  //   const minute = Number(time.split(':')[1]);

  //   // create a Date object at the desired timepoint
  //   const startTime = new Date(); startTime.setHours(hour, minute);
  //   const now = new Date();

  //   // increase timepoint by 24 hours if in the past
  //   if (startTime.getTime() < now.getTime()) {
  //     startTime.setHours(startTime.getHours() + 24);
  //   }

  //   // get the interval in ms from now to the timepoint when to trigger the alarm
  //   const firstTriggerAfterMs = startTime.getTime() - now.getTime();

  //   // trigger the function triggerThis() at the timepoint
  //   // create setInterval when the timepoint is reached to trigger it every day at this timepoint
  //   setTimeout(function(){
  //     triggerThis();
  //     setInterval(triggerThis, 24 * 60 * 60 * 1000);
  //   }, firstTriggerAfterMs);

  // }

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
            My Asset History
            <div className='asset-history'>
              <div class="tsum">Total Assets Sum: <span>{sum+'USDT'}</span></div>

              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Amount(USDT)</th>
                    <th>Daily Profit</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Daily Profit Ratio</th>
                    <th>Mininum Duration</th>
                    <th>Wallet Address</th>
                  </tr>
                </thead>
              <tbody>
                  {userAssets.map((asset) => (
                      <tr key={asset._id}>
                        <td>#</td>
                        <td>{asset.amount}</td>
                        <td>{asset.dailyprofit+ "USDT"}</td>
                        <td>{asset.assettype + " usdt"}</td>
                        <td>{asset.status}</td>
                        <td>{asset.assetdailyprofitratio +'%'}</td>
                        <td>{asset.minassetduration+'s'+" (24Hours)"}</td>
                        <td>{asset.shortassetaddress+'...'}</td>
                      </tr>
                ))}
              </tbody>
            </Table>
            
              <div className="link-sect">
                <ul>
                    <li><a href={`/dashboard/withdrawals/${userDetails.username}`}  >Withdraw History</a></li>
                    <li><a href={`/dashboard/addasset/${userDetails.username}`}>Add Asset</a></li>
                </ul>
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
