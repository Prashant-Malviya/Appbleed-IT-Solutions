import { Anchor, Button, Container, Text, Title } from '@mantine/core';
import classes from './Home.module.css';
import bgImg from "../../images/bg-image.avif"
import { useNavigate } from 'react-router-dom';

export function HomePage() {

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/items')
  }

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', 
        height: '100vh',
      }}
    >
      <Container size="lg"
      style={{
        position: "relative",
        top:"8rem"
      }}
      >
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Welcome To{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                Appbleed
              </Text>{' '}
              IT Solutions Provider
            </Title>

            <Text className={classes.description} mt={30} size='1.7rem'>
            We Provide Outsourced It Services For Small And Mid-sized Businesses. <br />
            To Know More About Us Please Visit Us @ <Anchor href='https://appbleed.com/' target='_blank' style={{
              textDecoration:"none"
            }}>Appbleed</Anchor>
            </Text>


            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={40}
              onClick={()=>handleClick()}
            >
              Our Products
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
