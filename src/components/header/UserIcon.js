import { Box, Avatar, IconButton, Menu, MenuItem, styled } from "@mui/material";
import { getUserInitials, isAdmin } from "../../helpers";
import { useUser } from "../../hooks";
import { Link } from "../atoms";
import { useState } from "react";
import { logout } from "../../redux";
import { useDispatch } from "react-redux";
import { Button } from "../atoms";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10
}));

export const UserIcon = () => {

    const { userData } = useUser();
    const [anchor, setAnchor] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Box>
            <IconButton onClick={(e) => setAnchor(e.target)}>
                <Avatar>
                    {getUserInitials(userData)}
                </Avatar>
            </IconButton>
            <Menu anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={() => setAnchor(null)} >
                <StyledBox>
                    {!userData && (
                        <>
                            <MenuItem>
                                <Link to='/login'>Sign In</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to='/signup'>Sign Up</Link>
                            </MenuItem>
                        </>
                    )}
                    {userData && <MenuItem>
                        <Button onClick={() => {
                            dispatch(logout())
                            navigate('/')
                        }}>
                            Log Out
                        </Button>
                    </MenuItem>}
                    {isAdmin(userData) && <MenuItem><Link to='/products/add'>Add Products</Link></MenuItem>}
                </StyledBox>
            </Menu>
        </Box>
    );
};
