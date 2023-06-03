import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';

import SwitchThemeButton from '../ui/SwitchThemeButton';

const PAGES = ['Home', 'Sign up', 'Login'];
const SETTINGS = ['My Profile', 'My Hotels', 'Logout'];

const Navigation = () => {
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleShowNav = event => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNav = () => {
		setAnchorElNav(null);
	};

	const handleShowUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position='sticky' sx={{ backgroundColor: 'var(--nav-color)', mb: 3 }}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component={Link}
						to='/'
						sx={{
							mr: 5,
							display: { xs: 'none', sm: 'flex' },
							fontWeight: 700,
							color: 'var(--font-color)',
							textDecoration: 'none',
						}}>
						BookStay
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
						{PAGES.map(page => (
							<Button
								key={page}
								component={NavLink}
								to={page === 'Home' ? `/` : `/${page.toLowerCase().replace(' ', '-')}`}
								sx={{
									my: 1,
									mr: 2,
									color: 'var(--font-color)',
									display: 'block',
									'&.active': {
										backgroundColor: 'var(--font-color)',
										color: 'var(--active-link)',
									},
								}}>
								{page}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							color='inherit'
							onClick={handleShowNav}>
							<MenuIcon sx={{ color: 'var(--font-color)' }} />
						</IconButton>
						<Menu
							id='menu-appbar'
							open={Boolean(anchorElNav)}
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
							onClose={handleCloseNav}>
							{PAGES.map(page => (
								<MenuItem key={page} onClick={handleCloseNav}>
									<Button
										key={page}
										component={NavLink}
										to={page === 'Home' ? `/` : `/${page.toLowerCase().replace(' ', '-')}`}
										sx={{
											my: 2,
											color: 'var(--font-color)',
											display: 'block',
											'&.active': {
												backgroundColor: 'var(--font-color)',
												color: 'var(--active-link)',
											},
										}}>
										{page}
									</Button>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Typography
						variant='h5'
						noWrap
						component={Link}
						to='/'
						sx={{
							mr: 2,
							flexGrow: 1,
							display: { xs: 'flex', sm: 'none' },
							fontWeight: 700,
							color: 'var(--font-color)',
							textDecoration: 'none',
						}}>
						BookStay
					</Typography>

					<SwitchThemeButton/>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton sx={{ p: 0 }} onClick={handleShowUserMenu}>
								<Avatar alt='User' />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
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
							onClose={handleCloseUserMenu}>
							{SETTINGS.map(setting => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign='center'>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navigation;
