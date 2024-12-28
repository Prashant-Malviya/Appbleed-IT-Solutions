import { IconMoon, IconSun } from "@tabler/icons-react";
import {
  Burger,
  Group,
  TextInput,
  ActionIcon,
  useMantineColorScheme,
  Text,
  Anchor,
  Drawer,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import classes from "./Header.module.css";

const links = [
  { link: "/", label: "Home" },
  { link: "/items", label: "Items" },
  { link: "/about", label: "About Us" },
  { link: "/contact", label: "Contact Us" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { searchTerm, setSearchTerm } = useSearch(); 
  const { colorScheme, toggleColorScheme } = useMantineColorScheme(); 
  const isDark = colorScheme === "dark";

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={classes.link}
      onClick={close} 
    >
      {link.label}
    </NavLink>
  ));

  const itemsForSmall = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={classes.linksForSmall}
      onClick={close} 
    >
      {link.label}
    </NavLink>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {/* Burger Menu */}
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="md" />
          <Anchor href="/" style={{
            textDecoration:"none"
          }}>
            <Text
              variant="gradient"
              component="span"
              gradient={{ from: "purple", to: "yellow" }}
              size="2rem"
            >
              Appbleed
            </Text>
          </Anchor>
        </Group>

        <Group>
          {/* Links for larger screens */}
          <Group ml={50} gap={5} className={classes.links} visibleFrom="md">
            {items}
          </Group>

          {/* Search Input with Dark Mode Toggle */}
          <Group align="center" visibleFrom="md">
            <TextInput
              className={classes.search}
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ActionIcon
              variant="outline"
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              size="lg"
            >
              {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
          </Group>
        </Group>
      </div>

      {/* Drawer for Small Screens */}
      <Drawer
        opened={opened}
        onClose={close}
        title="Navigation"
        padding="md"
        size="md"
      >
        <div>
          {itemsForSmall}
           
            <ActionIcon
              variant="outline"
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              size="lg"
              style={{margin:"1rem"}}
            >
              {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>


        </div>


      </Drawer>
    </header>
  );
}
