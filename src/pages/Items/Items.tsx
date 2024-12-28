import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Text,
  SimpleGrid,
  Loader,
  Container,
  Notification,
  Pagination,
  Select,
  TextInput,
} from "@mantine/core";
import { IconAlertCircle} from "@tabler/icons-react";
import { useSearch } from "../../context/SearchContext";
import { api_url } from "../../api/api";

interface Post {
  id: number;
  title: string;
}

export const Items: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterChar, setFilterChar] = useState<string | null>(null);
  const postsPerPage = 10;

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterChar) {
      filtered = filtered.filter(
        (post) =>
          post.title.charAt(0).toLowerCase() === filterChar.toLowerCase()
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterChar, posts]);

  if (loading) {
    return (
      <Container size="lg" py="xl" style={{ textAlign: "center", position:"relative", top:"10rem" }}>
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" py="xl" style={{ textAlign: "center" }}>
        <Notification color="red" icon={<IconAlertCircle size={18} />}>
          {error}
        </Notification>
      </Container>
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const uniqueFirstChars = Array.from(
    new Set(posts.map((post) => post.title.charAt(0).toUpperCase()))
  ).sort();

  return (
    <div style={{
      position:"relative",
      top:"5rem",
      marginBottom:"6rem",
      minHeight:"100vh"
    }}>
      <Container style={{
        display:"flex",
        justifyContent:"center"
      }}>
        <Text
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
          style={{
            textAlign:"center",
            fontSize: "3rem",
            fontWeight: "bolder",
            padding: "1rem",
          }}
        >
          Our Items
        </Text>
      </Container>

      <Container size="lg" py="sm">
        <TextInput
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "1rem" }}
          hiddenFrom="md"
        />

        <Select
          label="Filter by First Character"
          placeholder="Select a character"
          data={uniqueFirstChars.map((char) => ({ value: char, label: char }))}
          value={filterChar}
          onChange={setFilterChar}
          clearable
          style={{ marginBottom: "1rem" }}
        />

        <SimpleGrid
          cols={3}
          spacing="lg"
          style={{ marginBottom: "2rem" }}
          visibleFrom="md"
        >
          {currentPosts.map((post) => (
            <Link
              to={`/item/${post.id}`}
              key={post.id}
              style={{ textDecoration: "none" }}
            >
              <Card shadow="md" radius="md" padding="xl">
                <Text fz="lg" fw={500}>
                  {post.title}
                </Text>
              </Card>
            </Link>
          ))}
        </SimpleGrid>

        <SimpleGrid
          cols={1}
          spacing="lg"
          style={{ marginBottom: "2rem" }}
          hiddenFrom="md"
        >
          {currentPosts.map((post) => (
            <Link
              to={`/item/${post.id}`}
              key={post.id}
              style={{ textDecoration: "none" }}
            >
              <Card shadow="md" radius="md" padding="xl">
                <Text fz="lg" fw={500}>
                  {post.title}
                </Text>
              </Card>
            </Link>
          ))}
        </SimpleGrid>

        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            total={Math.ceil(filteredPosts.length / postsPerPage)}
            value={currentPage}
            onChange={setCurrentPage}
          />
        </Container>
      </Container>
    </div>
  );
};
