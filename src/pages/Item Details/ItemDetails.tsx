import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Text, ThemeIcon, Loader, Notification, Container } from "@mantine/core";
import { IconColorSwatch, IconAlertCircle } from "@tabler/icons-react";
import classes from "./ItemDetails.module.css";
import { item_details_url } from "../../api/api";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${item_details_url}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch item details");
        }
        const data = await response.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Container size="lg" py="xl" style={{ textAlign: "center" }}>
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

  return (
    <Container size="sm" py="xl" style={{
      position:"relative",
      top:"8rem"
    }}>
      <Paper withBorder radius="md" className={classes.card} p="xl">
        <ThemeIcon
          size="xl"
          radius="md"
          variant="gradient"
          gradient={{ deg: 0, from: "pink", to: "orange" }}
        >
          <IconColorSwatch size={28} stroke={1.5} />
        </ThemeIcon>
        <Text size="xl" fw={500} mt="md" >
          {post?.title}
        </Text>
        <Text size="sm" mt="sm" c="dimmed">
          {post?.body}
        </Text>
      </Paper>
    </Container>
  );
};
