import {
  Avatar,
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
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useState } from 'react'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { useUserStore } from '../stores/customerStore'

const settings = [
  'My training templates',
  'Trainings history',
  'Start a training',
  'Sign out',
]

function NavbarGuest() {
  const [isOpened, setIsOpened] = useState(false)
  const location = useLocation()

  const navigate = useNavigate()
  // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const userStore = useUserStore()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleProfileSettings = (index: number) => {
    setAnchorElUser(null)

    switch (index) {
      case 0:
        navigate('/templates')
        break
      case 1:
        navigate('/history')
        break
      case 2:
        navigate('/training')
        break
      default:
        userStore.logout()
        break
    }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <nav className="flex justify-between bg-primary px-8 pb-6 pt-8 font-bold lg:mx-0 lg:justify-around">
        {location.pathname === '/' ? (
          <Link to="/" className="block lg:hidden">
            <Logo className="static" />
          </Link>
        ) : (
          <Link to="/">
            <Logo className="static" />
          </Link>
        )}

        {/* hidden on < lg */}
        <div className="hidden transform gap-4 text-xl *:transition-transform hover:*:scale-110 hover:after:*:w-full lg:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/exercises">Browse exercises</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div className="flex">
          {location.pathname !== '/login' && !userStore.isLoggedIn && (
            <Link to="/login" className="mt-2 lg:mt-0">
              <Button variant="contained" color="secondary">
                Sign in
              </Button>
            </Link>
          )}

          {userStore.isLoggedIn && (
            <Box sx={{ flexGrow: 0, marginLeft: { xs: '40px', md: '130px' } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                  <Avatar style={{ backgroundColor: '#F5980E' }}>
                    {userStore?.user?.email.slice(0, 3)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleProfileSettings(index)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          <IconButton
            onClick={() => setIsOpened(true)}
            aria-label="delete"
            size="large"
            sx={{ ml: 2, display: { xs: 'block', md: 'none' } }}
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
  const getUrl = (index: number) => {
    switch (index) {
      case 0:
        return '/'
      case 1:
        return '/exercises'
      case 2:
        return '/contact'
      default:
        return '/'
    }
  }
  const list = () => (
    <Box
      role="presentation"
      onClick={() => onChange(false)}
      onKeyDown={() => onChange(false)}
    >
      <List>
        {['Home', 'Browse Exercise', 'Contact'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <Link to={getUrl(index)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </Link>
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

export default NavbarGuest
