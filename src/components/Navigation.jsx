import { useState, useContext } from 'react';
import { Link, NavLink, useRouteLoaderData, Form } from 'react-router-dom';

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

import { MaterialUISwitch } from '../ui/SwitchThemeButton';
import { ColorModeContext } from '../context/ThemeProvider';

const PAGES = ['Home', 'Sign up', 'Login'];
const SETTINGS = ['My Profile', 'My Hotels'];

const Navigation = () => {
	const token = useRouteLoaderData('root');

	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorElNav, setAnchorElNav] = useState(null);

	const { toggleColorMode } = useContext(ColorModeContext);

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
		<AppBar position='sticky' sx={{ mb: 3, transition: 'background-color 0.3s' }} color='inherit'>
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
							color: 'inherit',
							textDecoration: 'none',
						}}>
						BookStay
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
						{PAGES.map(page => {
							if ((token && page === 'Sign up') || (token && page === 'Login')) {
								return null;
							} else {
								return (
									<Button
										key={page}
										component={NavLink}
										to={
											page === 'Home'
												? `/`
												: page === 'Sign up'
												? '/authentication?mode=sign-up'
												: '/authentication?mode=login'
										}
										sx={{
											my: 1,
											mr: 2,
											color: 'inherit',
											display: 'block',
											'&.active': {
												bgcolor: 'ButtonShadow',
												color: 'ButtonText',
											},
										}}>
										{page}
									</Button>
								);
							}
						})}
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							color='inherit'
							onClick={handleShowNav}>
							<MenuIcon color='inherit' />
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
							{PAGES.map(page => {
								if ((token && page === 'Sign up') || (token && page === 'Login')) {
									return null;
								} else {
									return <MenuItem key={page} onClick={handleCloseNav}>
										<Button
											key={page}
											component={NavLink}
											to={
												page === 'Home'
													? `/`
													: page === 'Sign up'
													? '/authentication?mode=sign-up'
													: '/authentication?mode=login'
											}
											sx={{
												my: 1,
												mr: 2,
												color: 'inherit',
												display: 'block',
												'&.active': {
													bgcolor: 'ButtonShadow',
													color: 'ButtonText',
												},
											}}>
											{page}
										</Button>
									</MenuItem>;
								}
							})}
						</Menu>
					</Box>

					<Typography
						variant='h5'
						noWrap
						component={Link}
						color='inherit'
						to='/'
						sx={{
							mr: 2,
							flexGrow: 1,
							display: { xs: 'flex', sm: 'none' },
							fontWeight: 700,
							textDecoration: 'none',
						}}>
						BookStay
					</Typography>

					<MaterialUISwitch sx={{ mr: 2 }} onChange={toggleColorMode} />

					{token && (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title='Open settings'>
								<IconButton sx={{ p: 0 }} onClick={handleShowUserMenu}>
									<Avatar alt='User' src={token.photoURL}/>
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
										<Button
											color='inherit'
											component={NavLink}
											sx={{
												'&.active': {
													bgcolor: 'ButtonShadow',
													color: 'ButtonText',
												},
											}}
											to={`/${setting.toLocaleLowerCase().replace(' ', '-')}`}>
											{setting}
										</Button>
									</MenuItem>
								))}
								<MenuItem onClick={handleCloseUserMenu}>
									<Form action='logout' method='post'>
										<Button color='inherit' type='submit'>
											logout
										</Button>
									</Form>
								</MenuItem>
							</Menu>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navigation;
