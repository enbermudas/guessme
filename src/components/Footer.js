import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0
      }}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        align={{ base: 'center', md: 'center' }}>
        <Text>© {new Date().getFullYear()} <Link href="https://github.com/enbermudas" isExternal>Enrique Bermúdez</Link> & <Link href="https://github.com/Macoix" isExternal>Giuseppe Micucci</Link></Text>
      </Container>
    </Box>
  )
};

export default Footer;
