export default `
# 2023-03-17

Added:

* 'reliably' for syntax sugar, Check the jsDoc

Updated:

* 'rely()' returns null when token are null-like
* 'reliable()' returns token when token are reliable, instead of true.
* 'reliable()' and 'rely()' combination sequence can be simplify
	> 'rely(reliable(''ReliableTokenString'))'
`;