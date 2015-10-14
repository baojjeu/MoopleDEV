/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Sgt. Anderson - Hidden Street : Abandoned Tower
-- By ---------------------------------------------------------------------------------------------
	Copied from Nella by Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection){
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    var mapId = cm.getPlayer().getMapId();
    if (mapId == 922010000) {
        if (status == 0) {
            cm.sendNext("See you next time.");
        } else {
            cm.warp(221024500);
            cm.removeAll(4001023);
            cm.removeAll(4001022);
            cm.getEventManager("LudiPQ").setProperty("LPQOpen" , "true");
            cm.getEventManager("LudiPQbonus").setProperty("LPQbonusOpen" , "true");
            cm.dispose();
        }
    } else {
        if (status == 0) {
            var outText = "Once you leave the tower, you'll have to restart the whole party quest if you want to try it again.  Do you still want to leave this map?";
            if (mapId == 922011000) {
                outText = "Are you ready to leave this map?";
            }
            cm.sendYesNo(outText);
        } else if (mode == 1) {
            var eim = cm.getPlayer().getEventInstance(); // Remove them from the PQ!
            if (eim == null)
                cm.warp(922010000, "st00"); // Warp player
            else if (cm.isLeader()) {
                cm.getEventManager("LudiPQ").setProperty("LPQOpen" , "true");
                eim.disbandParty();
            }
            else
                eim.leftParty(cm.getPlayer());
            cm.dispose();
        }
    }
}