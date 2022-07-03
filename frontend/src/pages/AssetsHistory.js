import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Table from 'react-bootstrap/Table';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

export default function AssetsHistory() {
  
  const userDetails = JSON.parse(localStorage.getItem('userInfo'));
  const [userid] = useState(userDetails._id);
  const [userAssets, setUserAssets] = useState(userDetails.asset);
  const [status] = useState("Withdraw");

  function scheduleWithdrawal(updateassetprofitdetails) {
    const time = '00:00';
    // get hour and minute from hour:minute param received, ex.: '16:00'
    const hour = Number(time.split(':')[0]);
    const minute = Number(time.split(':')[1]);
    console.log(hour)
    console.log(minute)
    // create a Date object at the desired timepoint
    const startTime = new Date(); startTime.setHours(hour, minute);
    const now = new Date();
    console.log(startTime)
    // increase timepoint by 24 hours if in the past
    if (startTime.getTime() < now.getTime()) {
      startTime.setHours(startTime.getHours() + 24);
    }

    // get the interval in ms from now to the timepoint when to trigger the alarm
    const firstTriggerAfterMs = startTime.getTime() - now.getTime();

    // trigger the function triggerThis() at the timepoint
    // create setInterval when the timepoint is reached to trigger it every day at this timepoint
    setTimeout(function(){
      updateassetprofitdetails();
      setInterval(updateassetprofitdetails, 24 * 60 * 60 * 1000);
    }, firstTriggerAfterMs);

  }

  async function updateassetprofitdetails() {
    for(var i=0; i < userAssets.length; i++){
      const dailyPrft = userAssets[i].dailyprofit++;

      const assetaddTime_ = userAssets[i].assetaddtime;
    }
  }

  async function updateAssetWidthStatus() {
    for(var i=0; i < userAssets.length; i++){
      const minassetDurWindow = userAssets[i].minassetduration;
      const assetaddTime_ = userAssets[i].assetaddtime;
      const timeNow = new Date().getTime();
      const twentyfourHourCompletion = parseInt(assetaddTime_) + parseInt(minassetDurWindow);
      if(timeNow > twentyfourHourCompletion) {
        // allow withdrawal

        const assetid = userAssets[i]._id;

        try {
          const config = {
            headers: {
              "Content-type": "application/json"
            }
          }  
    
          const {data} = await axios.post("/api/users/updateassetwithdrawalstatus", {
            status,
            assetid
          }, config);

        } catch (error) {
          console.log(error.response.data)
        }
      }else {
        console.log('24 hour withdrawal not reached yet')
      }
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    getAssetDetails();
    scheduleWithdrawal();
    updateAssetWidthStatus();
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
      setUserAssets(data.asset)
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
              <div className="tsum">Total Assets Sum: <span>{sum+'USDT'}</span></div>

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

      </Container>
    </Page>
  );
}