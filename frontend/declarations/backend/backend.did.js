export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const ArtistInfo = IDL.Record({
    'bio' : IDL.Text,
    'name' : IDL.Text,
    'contactEmail' : IDL.Text,
  });
  const Work = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'imageUrl' : IDL.Text,
  });
  return IDL.Service({
    'addWork' : IDL.Func([IDL.Text, IDL.Text, IDL.Opt(IDL.Text)], [Result], []),
    'getArtistInfo' : IDL.Func([], [ArtistInfo], ['query']),
    'getWorks' : IDL.Func([], [IDL.Vec(Work)], ['query']),
    'updateArtistInfo' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
