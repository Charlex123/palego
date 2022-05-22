import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegSuccess() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const userDetails = JSON.parse(localStorage.getItem('userInfo'));
  const [e, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [passwordinputType, setpasswordinputType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState(<FontAwesomeIcon icon={faEye} />);
  
  
  const togglePasswordVisiblity = () => {
    if(passwordinputType === "password") {
      setpasswordinputType("text")
      setEyeIcon(<FontAwesomeIcon icon={faEye} />)
    }else {
      setpasswordinputType("password")
      setEyeIcon(<FontAwesomeIcon icon={faEyeSlash} />);
    }
  };
  

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }  
      setLoading(true)
      const {data} = await axios.post("/api/users/login/users", {
        email,
        password
      }, config);
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
      navigate(`/dashboard/app/${data.username}`, { replace: true })
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <Page title="Verify Email">
      <RootStyle>
        <HeaderStyle>
          <Logo />

        </HeaderStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Verify Your Email
            </Typography>

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                We've sent you an email with your email verification link
                <ul>
                    <li>
                        Check your inbox for your verification email
                    </li>
                    <li>
                        Check your spam folder if it's not found in your inbox
                    </li>
                    <li>
                        It can take up to 15mins to arrive
                    </li>
                </ul>

                Didn’t receive email?{' '}
                <form className="formTag" onSubmit={submitHandler}>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <button className="registerButton" type="submit">
                    Resend Link
                </button>
                </form>
              </Typography>
            )}

          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
