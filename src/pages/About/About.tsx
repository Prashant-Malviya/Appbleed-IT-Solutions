import cx from 'clsx';
import { Anchor, Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from './About.module.css';
import { useNavigate } from 'react-router-dom';

export function About() {

  const navigate = useNavigate();

  const handleContactClick = ()=>{
    navigate('/contact')
  }

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title} >
          Appbleed Is Known For{' '}
          <Text component="span" inherit className={classes.highlight}>
          Its It Solutions
          </Text>
        </Title>

        <Container size={940}>
          <Text size='2rem' className={classes.description}>
          We specialize in delivering outsourced IT services tailored for small and mid-sized businesses. Our solutions are designed to enhance efficiency, optimize resources, and provide reliable support for your technology needs.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg">
            <Anchor href='https://appbleed.com/' target='_blank' style={{
            textDecoration:'none',
            color:"inherit",
            fontWeight:"bold"
          }}>
            Get started
            </Anchor>
            
          </Button>
          <Button className={cx(classes.control, classes.secondaryControl)} size="lg" onClick={()=>handleContactClick()}>
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}