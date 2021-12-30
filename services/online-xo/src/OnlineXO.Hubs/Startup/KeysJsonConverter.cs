using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OnlineXO.Core;
using System;

namespace OnlineXO.Hubs.Startup
{
	public class KeysJsonConverter : JsonConverter<GameState>
	{
		public override void WriteJson(JsonWriter writer, GameState value, JsonSerializer serializer)
		{
			JObject o = (JObject)JToken.FromObject(value);
			var type = value.GetType().Name;
			o.AddFirst(new JProperty("type", type));
			o.WriteTo(writer);
		}

		public override GameState ReadJson(JsonReader reader, Type objectType, GameState existingValue, bool hasExistingValue, JsonSerializer serializer)
		{
			throw new NotImplementedException();
		}

		public override bool CanRead => false;
	}
}
