import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import landing from "./pages/landing";
import placeholder from "./pages/placeholder";
import home from "./pages/home";
import guest from "./pages/guest";
import { Notifications } from "react-push-notification";
import groupmenu from "./pages/groupmenu";
import groupMenuGuest from "./pages/groupmenu_guest";
import groupMenuOwner from "./pages/groupmenu_owner";
import generatedPlaylist from "./pages/generatedPlaylist";
import addMyMusic from "./pages/addMyMusic";
import members from "./pages/members.js";
import membersGuest from "./pages/membersGuest.js";
import membersOwner from "./pages/membersOwner.js";
import bannedMembers from "./pages/bannedMembers.js";
import addSongs from "./pages/addSongs";
import viewMusic from "./pages/viewMusic";
import viewMusicOwner from "./pages/viewMusicOwner";

const App = () => {
  return (
    <Router>
      <div>
        <Notifications />
        <Switch>
          <Route exact path="/" component={landing} />
          <Route exact path="/addSongs" component={addSongs}/>
          <Route exact path="/addMyMusic/:userStatus" component={addMyMusic}/>
          <Route exact path="/placeholder" component={placeholder} />
          <Route exact path="/home" component={home} />
          <Route exact path="/guest" component={guest} />
          <Route exact path="/groupmenu" component={groupmenu} />
          <Route exact path="/groupmenu/:playlistGenerated" component= {groupmenu}/>
          <Route exact path="/groupMenuGuest" component= {groupMenuGuest}/>
          <Route exact path="/groupMenuGuest/:playlistGenerated" component= {groupMenuGuest}/>
          <Route exact path="/groupMenuOwner" component ={groupMenuOwner}/>
          <Route exact path="/groupMenuOwner/:playlistGenerated" component= {groupMenuOwner}/>
          <Route
            exact
            path="/generatedPlaylist"
            component={generatedPlaylist}
          />
          <Route
            exact
            path="/generatedPlaylist/:userStatus"
            component={generatedPlaylist}
          />
          <Route exact path="/addMyMusic/:userStatus" component={addMyMusic} />
          <Route exact path="/bannedMembers" component={bannedMembers} />
          <Route exact path="/members" component={members} />
          <Route exact path="/membersGuest" component={membersGuest} />
          <Route exact path="/membersOwner" component={membersOwner} />
          <Route exact path="/viewMusic" component={viewMusic} />
          <Route exact path="/viewMusicOwner" component={viewMusicOwner} />
         </Switch>
      </div>
    </Router>
  );
};
export default App;
