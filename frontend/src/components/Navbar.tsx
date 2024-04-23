import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useState } from 'react'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

function Navbar() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <nav className="mx-8 mb-6 mt-7 flex justify-between bg-primary font-bold lg:mx-0 lg:justify-around">
        <Link to="/" className="block lg:hidden">
          <Logo className="static" />
        </Link>

        {/* hidden on < lg */}
        <div className="hidden transform gap-4 text-xl *:transition-transform hover:*:scale-110 hover:after:*:w-full lg:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/exercises">Browse exercises</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div className="flex">
          <Button variant="contained" color="secondary">
            Login
          </Button>

          <IconButton
            onClick={() => setIsOpened(true)}
            aria-label="delete"
            color="primary"
            size="large"
            sx={{ ml: 2 }}
          >
            <RxHamburgerMenu className="block lg:hidden" />
          </IconButton>
        </div>
      </nav>
      <NavDrawer isOpened={isOpened} onChange={setIsOpened} />
    </>
  )
}

function NavDrawer({
  isOpened,
  onChange,
}: {
  isOpened: boolean
  onChange: (value: boolean) => void
}) {
  const list = () => (
    <Box
      role="presentation"
      onClick={() => onChange(false)}
      onKeyDown={() => onChange(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
  return (
    <div>
      <Drawer anchor="right" open={isOpened} onClose={() => onChange(false)}>
        {list()}
      </Drawer>
    </div>
  )
}

export default Navbar
